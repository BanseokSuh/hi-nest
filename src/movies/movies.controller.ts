import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateMovieDto } from './dto/create.movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';


@Controller('movies')
export class MoviesController {

	constructor(private readonly moviesService: MoviesService) {

	}

	@Get()
	getAll(): Movie[] {
		return this.moviesService.getAll();
	}

	@Get('search')
	search(@Query('year') searchingYear: string) {
		return `We are searching for a movie made after: ${searchingYear} `;
	}

	@Get(':id')
	getOne(@Param('id') movieId: number): Movie {
		return this.moviesService.getOne(movieId);
	}

	@Post()
	create(@Body() movieData: CreateMovieDto) {
		return this.moviesService.create(movieData);
	}

	@Delete(":id")
	remove(@Param('id') movieId: number) {
		return this.moviesService.deleteOne(movieId);
	}

	@Patch(':id')
	patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
		return this.moviesService.update(movieId, updateData);
	}

		

	// 비밀번호 솔트로 해싱, 확인
	@Post('hash')
	async hashPassword(@Body() userInfo) {

		const password = userInfo.password; // 비밀번호 입력값
		const salt = await bcrypt.genSalt(); // 솔트
		const hash = await bcrypt.hash(password, salt); // 입력값과 솔트
		const isMatch = await bcrypt.compare(password, hash);

		return {
			password,
			salt,
			hash,
			isMatch
		}
	}
}
